import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-elements'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { searchFieldTextChange } from '../../../../actions/SearchActions'
import SearchResultListItem from './SearchResultListItem'
import QuantityModal from './QuantityModal'

class SearchModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showExtraModal: false,
            selectedResult: null
        }
    }

    _onChangeText(text) {
        this.props.searchFieldTextChange(this.props.searchType, text)
    }

    _clearText() {
        this.props.searchFieldTextChange(this.props.searchType, '')
    }

    _renderResults() {
        return this.props.searchResults.map((item, index) => 
            <SearchResultListItem 
                key={index} 
                info={item} 
                onPress={() => this.setState({ 
                    showExtraModal: true,
                    selectedResult: item
                })}
                // onPress={() => this.props.onSearchResultPress(item)} 
            />
        )
    }

    _dismissModal() {
        this._clearText()
        this.props.parentDismissModal()
    }

    _dismissQuantityModal() {
        this.setState({ 
            showExtraModal: false,
            selectedResult: null
        })
    }

    render() {
        const { searchFieldText, isVisible } = this.props
        const { modalStyle, modalContentContainerStyle } = styles

        return (
            <View >
                <Modal 
                    animationIn='slideInUp'
                    animationOut='slideOutUp'
                    isVisible={isVisible} 
                    style={modalStyle} 
                    onBackdropPress={this._dismissModal.bind(this)}
                    onSwipe={this._dismissModal.bind(this)}
                    swipeDirection="up"
                    swipeThreshold={100}
                >
                    <View style={modalContentContainerStyle}>
                        <SearchBar
                            showLoading
                            platform="ios"
                            clearIcon
                            round
                            value={searchFieldText}
                            lightTheme
                            placeholder='Search' 
                            onChangeText={text => this._onChangeText(text)}
                            onClearText={() => this._clearText()}
                        />
                        <View>
                            <ScrollView>
                                {this._renderResults()}
                            </ScrollView>
                        </View>
                    </View>
                    
                    <QuantityModal 
                        item={this.state.selectedResult}
                        isVisible={this.state.showExtraModal} 
                        parentDismissModal={this._dismissQuantityModal.bind(this)} 
                        buttonSubmitText='ADD'
                        onSubmitPress={this.props.onSearchResultAdd.bind(this)}
                        showExtraButton
                        extraButtonText='JUST WATCHING'
                    />
                </Modal>
            </View>
        )
    }
}

const styles = {
    modalStyle: {
        margin: 30,
        marginBottom: 60,
        padding: 20, 
        backgroundColor: 'white',
        borderRadius: 20
    },
    modalContentContainerStyle: {
        flex: 1
    }
}

const mapStateToProps = state => {
    return {
        searchFieldText: state.search.searchFieldText, 
        searchResults: state.search.searchResults
    }
}

export default connect(mapStateToProps, { searchFieldTextChange })(SearchModal)
